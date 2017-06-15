package com.xigua.demo;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		model.addAttribute("testData", "123");
		
		return "home";
	}
	/*
	 * 跳转页面
	 */
	@RequestMapping(value = "/showList", method = RequestMethod.GET)
	public String listView() {
		return "device/list";
	}
	
	@RequestMapping(value = "/testBoot", method = RequestMethod.GET)
	public String listTestView() {
		return "device/BootTest";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String listLogView() {
		return "login";
	}
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String goRegister() {
		return "register";
	}
	@RequestMapping(value = "/listDevice", method = RequestMethod.GET)
	public String listDeviceView() {
		return "device/listDevice";
	}
	@RequestMapping(value = "/skipping", method = RequestMethod.GET)
	public String listSkipping() {
		return "skip";
	}
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String listIndex() {
		return "index";
	}
}
