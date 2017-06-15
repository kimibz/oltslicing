package com.xigua.util;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


public class Util {
		//HTTP GET
		public JSONObject getJSONObj(String url){
			String userName = "admin";
			String password = "admin";
	        String strResult = "";
	        JSONObject object = new JSONObject();
			// 创建HttpClient实例
			// get请求返回结果  
	        CloseableHttpClient client = HttpClients.createDefault();  
	        CredentialsProvider credsProvider = new BasicCredentialsProvider();
	        UsernamePasswordCredentials usernamePassword = new UsernamePasswordCredentials(
	                userName, password);
	        credsProvider.setCredentials(AuthScope.ANY, usernamePassword);
	        //HttpClient上下文,保存用户名信息  
	        HttpClientContext context = HttpClientContext.create(); 
	        context.setCredentialsProvider(credsProvider); 
	        // 发送put请求  
	        HttpGet request = new HttpGet(url);  
	        // 设置请求和传输超时时间  
	        RequestConfig requestConfig = RequestConfig.custom()  
	                .setSocketTimeout(2000).setConnectTimeout(2000).build();  
	        request.setConfig(requestConfig); 
	        try {   
	            CloseableHttpResponse response = client.execute(request,context);  
	            //请求发送成功，并得到响应  
	            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {  
	                //读取服务器返回过来的json字符串数据  
	                HttpEntity entity = response.getEntity();  
	                strResult = EntityUtils.toString(entity, "utf-8");  
	                //把json字符串转换成json对象  
	                object = JSON.parseObject(strResult);
	            } else {
	            	System.err.print(response.getStatusLine().getStatusCode());
	                System.err.print("get请求提交失败:" + url);  
	            }  
	        } catch (IOException e) {  
	            System.err.print("get请求提交失败:" + url + e);  
	        } finally {  
	            request.releaseConnection();  
	        }  
	        return object;
		}
		public String getHostId(String node_id){
			String userName = "admin";
			String password = "admin";
			String hostId = "";
			//设备配置URL
			String url = "http://localhost:8181/restconf/config/network-topology:network-topology/"
					+ "topology/topology-netconf/node/"+node_id;
			// 创建HttpClient实例
			// get请求返回结果  
	        CloseableHttpClient client = HttpClients.createDefault();  
	        CredentialsProvider credsProvider = new BasicCredentialsProvider();
	        UsernamePasswordCredentials usernamePassword = new UsernamePasswordCredentials(
	                userName, password);
	        credsProvider.setCredentials(AuthScope.ANY, usernamePassword);
	        //HttpClient上下文,保存用户名信息  
	        HttpClientContext context = HttpClientContext.create(); 
	        context.setCredentialsProvider(credsProvider); 
	        // 发送put请求  
	        HttpGet request = new HttpGet(url);  
	        // 设置请求和传输超时时间  
	        RequestConfig requestConfig = RequestConfig.custom()  
	                .setSocketTimeout(2000).setConnectTimeout(2000).build();  
	        request.setConfig(requestConfig); 
	        try {
	            CloseableHttpResponse response = client.execute(request,context);  
	            //请求发送成功，并得到响应  
	            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) { 
	            	HttpEntity entity = response.getEntity();  
	                String strResult = EntityUtils.toString(entity, "utf-8");  
	                //把json字符串转换成json对象  
	                JSONObject object = JSON.parseObject(strResult);
	                JSONArray device = object.getJSONArray("node");
	                JSONObject device_obj = JSON.parseObject(device.get(0)+"");
	                hostId = device_obj.getString("host-tracker-service:id");
	            } else {
	            	System.err.print(response.getStatusLine().getStatusCode());
	                System.err.print("get请求提交失败:" + url);  
	            }  
	        } catch (IOException e) {  
	            System.err.print("get请求提交失败:" + url + e);  
	        } finally {  
	            request.releaseConnection();  
	        }
	        return hostId;
		}
		
}
