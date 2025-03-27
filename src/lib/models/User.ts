
export interface User {
  id?: number;
  name: string;
  voterId: string;
  age: number;
  email: string;
  address: string;
  password: string;
  createdAt?: Date;
}

// Mock database for our frontend demo
class UserDatabase {
  private users: User[] = [];
  private nextId = 1;

  register(user: User): User | null {
    // Check if voter ID or email already exists
    if (this.users.some(u => u.voterId === user.voterId || u.email === user.email)) {
      return null;
    }
    
    // Check age requirement
    if (user.age < 18) {
      return null;
    }
    
    const newUser = {
      ...user,
      id: this.nextId++,
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    return newUser;
  }
  
  findByVoterId(voterId: string): User | undefined {
    return this.users.find(u => u.voterId === voterId);
  }
  
  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }
  
  validateCredentials(voterId: string, password: string): User | null {
    const user = this.findByVoterId(voterId);
    
    if (user && user.password === password) {  // In a real system, we'd use bcrypt to compare
      return user;
    }
    
    return null;
  }
  
  getAll(): User[] {
    return this.users.map(u => ({...u, password: '******'})); // Don't expose passwords
  }
}

export const userDb = new UserDatabase();
