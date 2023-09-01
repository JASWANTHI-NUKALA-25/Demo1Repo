package com.model;

public class UserMainCode {
	public static int sumOfSquaresOfEvenDigits(int num1) {
		int sum=0;
		while(num1>0) {
			int lastdigit=num1%10;
			if(lastdigit%2==0) {
				sum=sum+lastdigit*lastdigit;
				
					
				
			}
			num1/=10;
				
			}
		
			
		return sum;
	}
	
	public static String getLargestWord(String str) {
		String strArray[] = str.split(" ");
		String longest_Word=" ";
		for (int i = 0; i < strArray.length; i++) {
			longest_Word=strArray[i];
		
			if(strArray[i].length()>longest_Word.length()) {
				System.out.println(longest_Word);
			}
		}
		return longest_Word;
	}
		
	}


