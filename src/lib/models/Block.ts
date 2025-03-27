
export interface BlockData {
  voterId: string;
  vote: string;
  timestamp: number;
}

export class Block {
  public index: number;
  public timestamp: number;
  public data: BlockData;
  public previousHash: string;
  public hash: string;
  public nonce: number;

  constructor(
    index: number,
    timestamp: number,
    data: BlockData,
    previousHash: string = ''
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  async calculateHashAsync(): Promise<string> {
    const data = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }

  calculateHash(): string {
    // Synchronous hash calculation using a simple hash algorithm
    // This is a simplified version that doesn't use external crypto modules
    let s = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
    let hash = 0;
    
    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert to a hexadecimal string and ensure it's always positive
    const hashHex = (hash >>> 0).toString(16).padStart(8, '0');
    
    // Pad to get a longer hash string similar to SHA-256 (64 chars)
    return hashHex.repeat(8);
  }

  async mineBlockAsync(difficulty: number): Promise<void> {
    const target = Array(difficulty + 1).join('0');
    
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = await this.calculateHashAsync();
    }
    
    console.log(`Block mined: ${this.hash}`);
  }
  
  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join('0');
    
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    
    console.log(`Block mined: ${this.hash}`);
  }
}
