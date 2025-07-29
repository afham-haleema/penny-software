import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(
      'mongodb+srv://afham:afham1234@nodetuts.opiyiwf.mongodb.net/penny?retryWrites=true&w=majority'
    ),
    AuthModule,
    UserModule,
    ShopModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
