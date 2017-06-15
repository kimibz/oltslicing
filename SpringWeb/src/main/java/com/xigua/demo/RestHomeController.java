package com.xigua.demo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xigua.model.Device;
import com.xigua.service.NetconfService;
import com.xigua.util.CipherUtil;
import com.xigua.util.Util;



@Controller
public class RestHomeController {
	@Autowired
	private NetconfService service;
	Util util = new Util();
	/**
	 * 修改设备名称
	 * 2016 0203 TJ
	 * @param modelMap
	 **/
	@RequestMapping(value = "/rest/deviceData/{node_id}", method = RequestMethod.PUT)
	@ResponseBody
	public void changeDeviceName(@PathVariable String node_id,@RequestBody String new_id) {
		service.changeDeviceName(node_id, new_id);
	}
	
	/*
	 * 返回所有设备信息
	 */
	@RequestMapping(value = "/rest/AlldeviceInfo.json", method = RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Device> getAllDevice(){
		List<Device> list = new ArrayList<Device>();
		Map<String, String> map= new HashMap<String , String>();
		map = service.getAll();
		for (Map.Entry<String, String> entry : map.entrySet()){
			Device device = new Device ();
			device.setNode_id(entry.getKey());
			device.setId(util.getHostId(entry.getKey()));
			device.setState(entry.getValue());
			list.add(device);
		}
		return list;
	}
	
	
	/**
	 * 批量新建设备发现
	 * 2016 0203 TJ
	 * @param modelMap
	 **/
	@RequestMapping(value = "/rest/spawnManyDevice.json", method = RequestMethod.PUT,produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public void spawnNewDevice(@RequestBody String text) {
		JSONObject jsonObj = JSON.parseObject(text);
		String start = jsonObj.getString("start");
		String end = jsonObj.getString("end");
		service.spawnNewDevice(Integer.parseInt(start), Integer.parseInt(end));
	}
	/**
	 * 批量删除设备发现
	 * 2016 0203 TJ
	 * @param modelMap
	 **/
	@RequestMapping(value = "/rest/deleteManyDevices.json", method = RequestMethod.DELETE,produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public void deleteDevice(@RequestBody String text) {
		JSONObject jsonObj = JSON.parseObject(text);
		String start = jsonObj.getString("start");
		String end = jsonObj.getString("end");
		service.deleteDevice(Integer.parseInt(start), Integer.parseInt(end));
	}
	/**
	 * 批量单个设备发现
	 * 2016 0203 TJ
	 * @param modelMap
	 **/
	@RequestMapping(value = "/rest/deleteOneDevice.json", method = RequestMethod.DELETE,produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public void deleteCertainDevice(@RequestBody String text) {
		service.deleteOneDevice(text);
	}
	
}
