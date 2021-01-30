/* eslint-disable camelcase */
import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;
  // Um usuário pode prestar muitos serviços (appointments)

  @ManyToOne(() => User) // Muitos agendamentos para um usuário
  @JoinColumn({ name: 'provider_id' }) // Qual é a coluna que vai identificar qual que é o user (prestador) desse agendamento
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
