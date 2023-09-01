package com.main;

import java.util.Scanner;


import com.model.ArithmeticOperations;
import com.model.CheckSum;
import com.model.UserMainCode;

public class Operations {

	public static void main(String[] args) {
		System.out.println(-5 + 8 * 6);
		System.out.println((55+9) % 9);
		System.out.println(20 + -3*5 / 8);
		System.out.println(5 + 15 / 3 * 2 - 8 % 3);
		
		ArithmeticOperations operations = new ArithmeticOperations();
		CheckSum checkSum = new CheckSum();
		UserMainCode usermaincode = new UserMainCode();
		/*
		 * Scanner sc = new Scanner(System.in);
		 * System.out.println("Enter the First Number"); int num1 = sc.nextInt();
		 * System.out.println("Enter the Second Number"); int num2 = sc.nextInt();
		 * System.out.println(operations.add(num1, num2));
		 * System.out.println(operations.sub(num1, num2));
		 * System.out.println(operations.mul(num1, num2));
		 * System.out.println(operations.div(num1, num2));
		 */
		
		/*
		 * Scanner sc1 = new Scanner(System.in);
		 * System.out.println("Enter the First Number"); int num1 = sc1.nextInt();
		 * System.out.println("Enter the Second Number"); int num2 = sc1.nextInt();
		 * System.out.println("Enter the Third Number"); int num3 = sc1.nextInt();
		 * System.out.println(operations.average(num1, num2, num3));
		 */
		
		/*
		 * Scanner sc2 = new Scanner(System.in); int temp;
		 * System.out.println("Enter the First Number"); int num1 = sc2.nextInt();
		 * System.out.println("Enter the Second Number"); int num2 = sc2.nextInt();
		 * System.out.println("Before Swapping num1: "+num1+" num2: "+num2); temp=num1;
		 * num1=num2; num2=temp;
		 * System.out.println("After Swapping num1: "+num1+" num2: "+num2);
		 */
		/*
		 * Scanner sc3 = new Scanner(System.in);
		 * System.out.println("Enter the First Number"); int num1 = sc3.nextInt();
		 * System.out.println(operations.primeNumber(num1));
		 */
		 
		 //System.out.println("The ascii value of given character is "+operations.ascii('a'));
		 
			/*
			 * Scanner sc4 = new Scanner(System.in);
			 * System.out.println("Enter the First Number"); int num1 = sc4.nextInt();
			 * operations.multiples();
			 */
		
		 
		 
		 System.out.println(checkSum.checkSum(84228));
		 System.out.println("Square of evens is"+" "+usermaincode.sumOfSquaresOfEvenDigits(2222));
		 System.out.println(usermaincode.getLargestWord("Welcome to the world of Programming"));
		
		
	}

}
 
