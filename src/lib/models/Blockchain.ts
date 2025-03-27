
import { Block, BlockData } from './Block';

export class Blockchain {
  public chain: Block[];
  public difficulty: number;
  
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2; // Adjust based on desired mining difficulty
  }
  
  createGenesisBlock(): Block {
    return new Block(0, Date.now(), { voterId: 'genesis', vote: 'genesis', timestamp: Date.now() }, '0');
  }
  
  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
  
  addBlock(data: BlockData): Block {
    const previousBlock = this.getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newBlock = new Block(newIndex, Date.now(), data, previousBlock.hash);
    
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    
    return newBlock;
  }
  
  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      
      // Validate hash
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      
      // Validate chain link
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
  
  // Find if a voter has already voted
  hasVoted(voterId: string): boolean {
    return this.chain.some(block => 
      block.data.voterId === voterId && block.index > 0 // Skip genesis block
    );
  }
  
  // Get voting results
  getResults(): Record<string, number> {
    const results: Record<string, number> = {};
    
    this.chain.forEach(block => {
      // Skip genesis block
      if (block.index > 0) {
        const { vote } = block.data;
        results[vote] = (results[vote] || 0) + 1;
      }
    });
    
    return results;
  }
}

// Create a singleton instance of the blockchain
export const blockchain = new Blockchain();
