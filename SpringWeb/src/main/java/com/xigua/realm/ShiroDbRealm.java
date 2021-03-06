package com.xigua.realm;

import java.util.HashSet;
import java.util.Set;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.xigua.model.User;
import com.xigua.service.UserService;
import com.xigua.util.CipherUtil;





public class ShiroDbRealm extends AuthorizingRealm {
	private static Logger logger = LoggerFactory.getLogger(ShiroDbRealm.class);
	private static final String ALGORITHM = "MD5";
	
	@Autowired
	private UserService userService;

	public ShiroDbRealm() {
		super();
	}
	
	/**
	 * 验证登录
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		System.out.println(token.getUsername());
		User user = userService.findUserByLoginName(token.getUsername());
		System.out.println(user);
		CipherUtil cipher = new CipherUtil();//MD5加密
		if (user != null && user.getStatus() == 1) {
			return new SimpleAuthenticationInfo(user.getName(), cipher.generatePassword(user.getPassword()), getName());
		}else{
			throw new AuthenticationException();
		}
	}

	/**
	 * 登陆成功之后，进行角色和权限验证֤
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		/*这里应该根据userName使用role和permission 的serive层来做判断，并将对应 的权限加进来，下面简化了这一步*/
		User user = userService.findUserByLoginName(principals.getPrimaryPrincipal().toString());
		int role = user.getRole();
		Set<String> roleNames = new HashSet<String>();
	    Set<String> permissions = new HashSet<String>();
	    if(role == 1){
	    	roleNames.add("user");//添加角色。对应到index.jsp
	    	permissions.add("create");
	    }else{
	    	roleNames.add("administrator");
	    	permissions.add("delete");//添加权限,对应到index.jsp
	    	permissions.add("create");
	    }
//	    permissions.add("delete");//添加权限,对应到index.jsp
//	    permissions.add("login.do?main");
//	    permissions.add("login.do?logout");
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);
	    info.setStringPermissions(permissions);
		return info;
	}


	/**
	 * 清除所有用户授权信息缓存.
	 */
	public void clearCachedAuthorizationInfo(String principal) {
		SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());
		clearCachedAuthorizationInfo(principals);
	}


	/**
	 * 清除所有用户授权信息缓存.
	 */
	public void clearAllCachedAuthorizationInfo() {
		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
		if (cache != null) {
			for (Object key : cache.keys()) {
				cache.remove(key);
			}
		}
	}

//	@PostConstruct
//	public void initCredentialsMatcher() {//MD5加密
//		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(ALGORITHM);
//		setCredentialsMatcher(matcher);
//	}
}
