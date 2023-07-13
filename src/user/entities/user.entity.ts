// create table clippy.user
// (
//     id                      int auto_increment comment '회원 고유번호'
//         primary key,
//     google_id               int                                  not null comment '구글 ID',
//     google_display_name     varchar(32)                          not null comment '구글 닉네임',
//     profile_description      mediumtext                           null comment '프로필 설명',
//     email                   varchar(64)                          null comment '이메일 주소',
//     google_access_token     varchar(128)                         not null comment '구글 액세스 토큰',
//     google_refresh_token    varchar(128)                         null comment '구글 리프레시 토큰',
//     created_at              datetime default current_timestamp() not null comment '계정 생성 일시',
//     updated_at              datetime default current_timestamp() not null comment '계정 수정 일시',
//     is_deleted              tinyint  default 0                   not null comment '삭제 여부 (0 회원 1 탈퇴)',
//     deleted_at              datetime                             null comment '탈퇴 일시'
// )
//     comment '회원';

import {
  Model,
  Table,
  Column,
  DataType,
  Sequelize,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
  comment: '회원',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})
export class User extends Model<User> {
  @Column({
    field: 'id',
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '회원 고유번호',
  })
  id: number;

  @Column({
    field: 'google_id',
    type: DataType.INTEGER,
    allowNull: false,
    comment: '구글 ID',
  })
  googleId: number;

  @Column({
    field: 'google_display_name',
    type: DataType.STRING(32),
    allowNull: false,
    comment: '구글 닉네임',
  })
  googleDisplayName: string;

  @Column({
    field: 'email',
    type: DataType.STRING(64),
    allowNull: true,
    comment: '이메일 주소',
  })
  email: string;

  @Column({
    field: 'google_access_token',
    type: DataType.STRING(128),
    allowNull: false,
    comment: '구글 액세스 토큰',
  })
  googleAccessToken: string;

  @Column({
    field: 'google_refresh_token',
    type: DataType.STRING(128),
    allowNull: true,
    comment: '구글 리프레시 토큰',
  })
  googleRefreshToken: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '계정 생성 일시',
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '계정 수정 일시',
  })
  updatedAt: Date;

  @Column({
    field: 'is_deleted',
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: '삭제 여부 (0 회원 1 탈퇴)',
  })
  isDeleted: number;

  @Column({
    field: 'deleted_at',
    type: DataType.DATE,
    allowNull: true,
    comment: '탈퇴 일시',
  })
  deletedAt: Date;
}
