package com.model;

public class CheckSum {
	public static int checkSum(int num1) {
		int sum=0;
		while(num1>0) {
			int lastdigit=num1%10;
			sum=sum+lastdigit;
			num1/=10;
		}
		
		
			System.out.println("sum is:"+sum);
			if(sum%2==0) {
				return -1;
			}
			else {
				return 1;
			}
		
		
	}
}


