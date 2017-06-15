package com.xigua.constant;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xigua.model.User;
import com.xigua.serviceImp.NetconfServiceImp;

public class TestObjToJson {
	public static void main(String args[]){
		User user = new User();
		user.setAge(12);
		user.setEmail("11@11.com");
		user.setName("xigua");
		user.setPassword("123456");
		String jsonString = JSON.toJSONString(user);
		System.out.println(jsonString);
		String str = "{\"node\":[{\"node-id\":\"\",\"username\":\"\","
				+ "\"password\":\"\",\"host\":\"\",\"port\":\"\","
				+ "\"tcp-only\":\"\",\"reconnect-on-changed-schema\":\"\","
				+ "\"keepalive-delay\":\"\",\"pass-through\":{}}]}";
		JSONObject object = JSON.parseObject(str);
		System.out.println(object.toJSONString());
		JSONArray arr =object.getJSONArray("node");
		JSONObject device_obj = JSON.parseObject(arr.get(0)+"");
		device_obj.put("host", "127.0.0.1");
		arr.clear();
		arr.add(0, device_obj);
		object.put("node", arr);
		System.out.println(object.toString());;
		System.out.println(device_obj.get("host"));
		NetconfServiceImp service =new NetconfServiceImp();
		service.spawnNewDevice(1788, 1789);
    
	}
}
