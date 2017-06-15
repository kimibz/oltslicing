package com.xigua.constant;

import java.sql.DriverManager;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;

public class TransXml_Test {
	private static final Logger LOG = LoggerFactory.getLogger(TransXml_Test.class);
	public static void main(String args[]){
		String xmlStr = "<book xmlns=\"urn:ietf:params:xml:ns:netmod:notification:1.0\"><title xmlns=\"urn:ietf:params:xml:ns:netmod:notification:1.0\">A guide to "
				+ "the SQL standard</title></book> ";
		String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost:3306/shirotest?user=root&password=123456";
        String user = "root";
        String password = "123456";
//        int msg = xmlStr.indexOf("\"");
        //获取notification的消息类型，然后存入
        String msg = xmlStr.replace("\"", "\\\"");
//        String table_id ="remotedevice17830type";
        System.out.println(msg);
                try {
                Class.forName(driver);
                Connection conn = (Connection) DriverManager.getConnection(url, user, password);
                   if(!conn.isClosed())
                       LOG.info("Succeeded connecting to the Database!");
                   Statement statement = (Statement) conn.createStatement();
//                   String sql1 = "truncate table xmltest";
                   String sql = "insert into xmltest (msg) values ('"+msg+" ')";
                   System.out.println(sql);
                   statement.executeUpdate(sql);
                   LOG.info("mysql Success!!!!");
                   statement.close();
                   conn.close();}
                catch(ClassNotFoundException e) {
                	LOG.error("Sorry,can`t find the Driver!");
                	e.printStackTrace();
                } catch(SQLException e) {
                	e.printStackTrace();
                } catch(Exception e) {
                	e.printStackTrace();
        }
    }
}
