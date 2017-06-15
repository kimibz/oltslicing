package com.xigua.model;

public class NetconfDevice {
	private String host;
	
	private String username;
	
	private String password;
	
	private boolean ifTcp;
	
	private int port;
	
	private String hostId;
	
	private int keep_alive;
	
	private boolean reconnect_on_changed_schema;

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isIfTcp() {
		return ifTcp;
	}

	public void setIfTcp(boolean ifTcp) {
		this.ifTcp = ifTcp;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getHostId() {
		return hostId;
	}

	public void setHostId(String hostId) {
		this.hostId = hostId;
	}

	public int getKeep_alive() {
		return keep_alive;
	}

	public void setKeep_alive(int keep_alive) {
		this.keep_alive = keep_alive;
	}

	public boolean isReconnect_on_changed_schema() {
		return reconnect_on_changed_schema;
	}

	public void setReconnect_on_changed_schema(boolean reconnect_on_changed_schema) {
		this.reconnect_on_changed_schema = reconnect_on_changed_schema;
	}

}
