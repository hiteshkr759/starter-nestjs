import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OrdersModule } from './orders/orders.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { PuppeteerModule } from 'nest-puppeteer';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { OrdersService } from './orders/orders.service';

@Module({
  imports: [
    // PuppeteerModule.forRoot({
    //   isGlobal: true,
    //   pipe: true,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_PASSWORD,
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      migrationsRun: false,
      dropSchema: false,
      synchronize: true,
      logging: ['error'],
    }),
    UsersModule,
    ProductsModule,
    CustomersModule,
    SuppliersModule,
    OrdersModule,
    PurchaseOrdersModule,
  ],
  controllers: [AppController, WhatsappController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('process.env.FRONT_END_PATH', process.env.FRONT_END_PATH);
  }
}
