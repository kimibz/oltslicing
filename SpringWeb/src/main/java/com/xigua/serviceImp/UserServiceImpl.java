package com.xigua.serviceImp;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xigua.dao.UserDao;
import com.xigua.exception.ServiceException;
import com.xigua.model.User;
import com.xigua.service.UserService;






@Service("userService")
public class UserServiceImpl implements UserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserDao userDao;

	public User getUserById(int id) {
		return userDao.selectByPrimaryKey(id);
	}

	public User findUserByLoginName(String username) {
		logger.info("findUserByLoginName "+username+"call success!");
		return userDao.findUserByLoginName(username);
	}
	
	public void insertNewUser (User user){
		userDao.insert(user);
	}

	@Override
	public void processActivate(String username, String validateCode) throws ParseException, ServiceException {
		// TODO Auto-generated method stub
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		User user=userDao.findUserByLoginName(username);  
        //验证用户是否存在   
        if(user!=null) {    
            //验证用户激活状态    
            if(user.getStatus()==0) {   
                ///没激活  
                Date currentTime = new Date();//获取当前时间    
                Date registerTime = user.getRegisterTime();
                Date d1 =dateFormat.parse(dateFormat.format(currentTime));
                Date d2 =dateFormat.parse(dateFormat.format(registerTime));
                long diff = d1.getTime() - d2.getTime();
                long days = diff / (1000 * 60 * 60 * 24);  
                long hours = (diff-days*(1000 * 60 * 60 * 24))/(1000* 60 * 60); 
                long minutes = (diff-days*(1000 * 60 * 60 * 24)-hours*(1000* 60 * 60))/(1000* 60); 
                //验证链接是否过期   
                if(minutes < 15) {    
                    //验证激活码是否正确    
                    if(validateCode.equals(user.getValidateCode())) {    
                        //激活成功， //并更新用户的激活状态，为已激活   
                    	logger.info("==sq==="+user.getStatus());  
                        user.setStatus(1);//把状态改为激活  
                        logger.info("==sh==="+user.getStatus());  
                        userDao.updateByPrimaryKey(user);
                    } else {    
                       throw new ServiceException("激活码不正确");    
                    }    
                } else { throw new ServiceException("激活码已过期！");    
                }    
            } else {  
               throw new ServiceException("邮箱已激活，请登录！");    
            }    
        } else {  
            throw new ServiceException("该邮箱未注册（邮箱地址不存在）！");    
        }    
	}
}
