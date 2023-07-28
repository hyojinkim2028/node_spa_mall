// 클래스

class User {
    constructor(name, age, tech) { // User 클래스의 생성자
      this.name = name;
      this.age = age;
      this.tech = tech;
    }

    getName() { return this.name; } // getName 메서드
    getAge() { return this.age; } // getAge 메서드
    getTech() { return this.tech; } // getTech 메서드
  }
  
  const user = new User("이용우", "28", "Node.js"); // user 인스턴스 생성
  const user2 = new User("김효진","27세","Node.js")
  console.log(user.name); // 이용우
  console.log(user2); // 28
  console.log(user.tech); // Node.js

  console.log(user2.getName());

