package com.xigua.service;

import java.util.Map;

public interface NetconfService {
	/*
	 * 修改设备名称
	 */
	void changeDeviceName(String device_name,String new_name);
	/*/
	 * 返回所有设备是否连接的信息，存入map
	 */
	Map<String, String> getAll();
	/*
	 * 获取某个设备的状态信息
	 */
	Boolean getStatus(String device_name);
	/*
	 * 发现设备
	 */
	void spawnNewDevice(int StartPort,int endPort);
	/*
	 * 删除多个设备
	 */
	void deleteDevice(int StartPort,int endPort);
	/*
	 * 删除单个设备
	 */
	void deleteOneDevice(String device_nodeId);
}
