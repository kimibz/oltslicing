package com.xigua.demo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xigua.model.User;
import com.xigua.realm.ShiroDbRealm;
import com.xigua.service.UserService;
import com.xigua.util.CipherUtil;

@Controller
public class LogController {
	private static Logger logger = LoggerFactory.getLogger(ShiroDbRealm.class);
	@Autowired
	private UserService userService;
	
	/**
	 * 验证springmvc与batis连接成功
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("/{id}/showUser")
	public String showUser(@PathVariable int id, HttpServletRequest request) {
		User user = userService.getUserById(id);
		System.out.println(user.getName());
		request.setAttribute("user", user);
		return "showUser";
	}
	
	/**
	 * 初始登陆界面
	 * @param request
	 * @return
	 */
	@RequestMapping("/login.do")
	public String tologin(HttpServletRequest request, HttpServletResponse response, Model model){
		logger.debug("来自IP[" + request.getRemoteHost() + "]的访问");
		return "login";
	}
	
	/**
	 * 验证用户名和密码
	 * @param request
	 * @return
	 */
	@RequestMapping("/checkLogin.do")
	public String login(HttpServletRequest request) {
		String result = "login.do";
		// 取得用户名
		String username = request.getParameter("username");
		//取得 密码，并用MD5加密
		String password = CipherUtil.generatePassword(request.getParameter("password"));
		//String password = request.getParameter("password");
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		
		Subject currentUser = SecurityUtils.getSubject();
		try {
			System.out.println("----------------------------");
			if (!currentUser.isAuthenticated()){//使用shiro来验证
				token.setRememberMe(true);
				currentUser.login(token);//验证角色和权限
			}
			System.out.println("User verification success!");
			result = "device/listDevice";//验证成功
		} catch (Exception e) {
			logger.error(e.getMessage());
			result = "login.do";//验证失败
		}
		return result;
	}
  
    /**
     * 退出
     * @return
     */
    @RequestMapping(value = "/logout")  
    public String logout() {  
        Subject currentUser = SecurityUtils.getSubject();  
        String result = "login";  
        currentUser.logout();  
        return result;  
    }  
    /**
     * 
     * @return
     */
    @RequestMapping(value = "/chklogin", method = RequestMethod.POST)  
    @ResponseBody  
    public String chkLogin() {  
        Subject currentUser = SecurityUtils.getSubject();  
        if (!currentUser.isAuthenticated()) {  
            return "false";  
        }  
        return "true";  
    }   
    
    /*
	 * HTTP POST 登录(不能跳转页面所以暂不使用)
	 */
	@RequestMapping(value = "/rest/checkLogin.json", method = RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
	public String checkLogin(@RequestBody String text) {
		String result = "device/listDevice";
		JSONObject jsonObj = JSON.parseObject(text);
		// 取得用户名
		String username = jsonObj.getString("username");
		//取得 密码，并用MD5加密
		String password = CipherUtil.generatePassword(jsonObj.getString("password"));
//		String password = jsonObj.getString("password");
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		
		Subject currentUser = SecurityUtils.getSubject();
		try {
			System.out.println("----------------------------");
			if (!currentUser.isAuthenticated()){//使用shiro来验证
				token.setRememberMe(true);
				currentUser.login(token);//验证角色和权限
			}
			System.out.println("result: " + result);
			result = "device/listDevice";//验证成功
		} catch (Exception e) {
			result = "login";//验证失败
		}
		return result;
	}
}
