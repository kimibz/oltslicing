package com.xigua.dao;


import com.xigua.model.User;
public interface UserDao {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

	User findUserByLoginName(String username);
	
	User selectByCode(String code);
	
}