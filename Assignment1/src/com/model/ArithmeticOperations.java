package com.model;

public class ArithmeticOperations {
	
	public int add(int num1,int num2) {
		return num1+num2;
	}
	public int sub(int num1,int num2) {
		return num1-num2;
	}
	public int mul(int num1,int num2) {
		return num1*num2;
	}
	public int div(int num1,int num2) {
		return num1/num2;
	}
	public float average(int num1,int num2,int num3) {
		return (num1+num2+num3)/3;
	}
	public String primeNumber(int num1) {
		
		if(num1 >1 && num1%2==0) {
			return "Not a primeNumber";
		}
		else
		{
			return "primeNumber";
		}
		
	}
	public int ascii(char character) {
		int num=character;
		return num;
	}
	public void multiples() {
		for(int i=0;i<10;i++) {
			if(i%3==0) {
				System.out.println("Fizz");
			}
			else if(i%5==0) {
				System.out.println("Buzz");
			}
			else if(i%5==0 && i%3==0) {
				System.out.println("Fizz Buzz");
			}
			else {
				System.out.println("Invalid Input");
			}
				
		}
	}
	

}
