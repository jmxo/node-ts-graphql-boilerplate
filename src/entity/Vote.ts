import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Vote {
  @PrimaryColumn({ type: 'int' })
  userId: number;

  @PrimaryColumn({ type: 'int' })
  postId: number;

  @Column({ type: 'int' })
  value: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post;
}

// this technicque is useful if we need to add additional fields to the Vote (like value), instead of using manytomany on post for example.

// comment from YT: Just an FYI for anyone else trying this out:  The decorators on the join columns seem to need to be ManyToOne now.  If you use OneToOne and you have the "synchronize" flag set to true, your app will be unable to synchronize as TypeORM will try to create a uniqueness constraint on your keys on app start, which will fail since your table is many-to-many and you may have, for example, a single user editing multiple posts.  Otherwise this technique works perfectly!
