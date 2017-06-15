package com.xigua.constant;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TestDate {

	public static void main(String[] args) throws ParseException {
		// TODO Auto-generated method stub
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date currentTime = new Date();//获取当前时间    
		Date d1 =dateFormat.parse(dateFormat.format(currentTime));
		System.out.println(d1);
	}

}
