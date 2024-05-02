#include<stdio.h>
void Fibo(int n)
{
   int t1=0, t2=1, x;
   for(int i=0; i<n; i++)
   {
     printf("%d,", t1);
     x = t1+t2;
     t1 = t2;
     t2 = x;
   }
}

int main()
{
   int n;

   printf("Enter the term: ");
   scanf("%d", &n);

   printf("The fibonacci series is: \n");

   Fibo(n);

   return 0;
}