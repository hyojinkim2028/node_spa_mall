function errorException(amount, account) {
    try {
      console.log(`${amount}원 출금시도`);
      if (amount > account.balance) throw new Error();
      account.balance -= amount;
	  //console.log(`현재 잔고가 ${account.balance}남았습니다.`); // 출력되지 않음
    } catch (error) {
      console.log('잔액이 부족합니다.');
    } finally {
      console.log(`출금업무 종료됩니다. 잔고는 ${account.balance}원 입니다.`);
    }
  }
  const account = { balance: 5000 };


  errorException(3000,account);
  errorException(3000,account);
