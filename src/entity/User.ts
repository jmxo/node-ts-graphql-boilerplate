import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'bool', default: false })
  confirmed: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
