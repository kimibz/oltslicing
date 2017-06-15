package com.xigua.demo;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.xigua.email.SendEmail;
import com.xigua.exception.ServiceException;
import com.xigua.model.User;
import com.xigua.service.UserService;
import com.xigua.util.MD5Util;

@Controller
public class RegistercController {
	@Autowired
	private UserService userService;
	/**
	 * 新增用户
	 * @param request
	 * @return
	 */
	@RequestMapping("/registerNewUser.do")
	public String login(HttpServletRequest request) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date now = new Date();
		Timestamp timeStamp = new Timestamp(now.getTime());
		// 取得用户名
		User user = new User();
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String email = request.getParameter("email");
		user.setEmail(email);
		user.setPassword(password);
		user.setName(username);
		user.setValidateCode(MD5Util.encode2hex(email+dateFormat.format(now)));
		user.setStatus(0);
		user.setRole(0);
		user.setRegisterTime(timeStamp);
		userService.insertNewUser(user);
		 ///邮件的内容  
        StringBuffer sb=new StringBuffer("点击下面链接激活账号，48小时生效，否则重新注册账号，链接只能使用一次，请尽快激活！</br>");  
        sb.append("<a href=\"http://localhost:8081/demo/user/register?action=activate&id=");  
        sb.append(username);   
        sb.append("&validateCode=");   
        sb.append(user.getValidateCode());  
        sb.append("\">http://localhost:8081/demo/user/register?action=activate&id=");   
        sb.append(username);  
        sb.append("&validateCode=");  
        sb.append(user.getValidateCode());  
        sb.append("</a>");  
          
        //发送邮件  
        SendEmail.send(email, sb.toString());  

		return "login";
	}
	@RequestMapping(value="/user/register",method={RequestMethod.GET})  
    public ModelAndView  load(HttpServletRequest request,HttpServletResponse response) throws ParseException{  
        String action = request.getParameter("action");  
        System.out.println("-----r----"+action);  
        ModelAndView mav=new ModelAndView();    
        	if("activate".equals(action)) {  
            //激活  
            String id = request.getParameter("id");//获取email  
            String validateCode = request.getParameter("validateCode");//激活码  
              
            try {  
                userService.processActivate(id , validateCode);//调用激活方法  
                mav.setViewName("skip");  
            } catch (ServiceException e) {  
                request.setAttribute("message" , e.getMessage());  
                mav.setViewName("500");  
            }  
              
        }  
        return mav;  
    }
}
