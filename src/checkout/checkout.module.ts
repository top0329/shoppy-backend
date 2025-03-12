import Stripe from 'stripe';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ConfigModule, ProductsModule],
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
    {
      provide: Stripe,
      useFactory: (configService: ConfigService) =>
        new Stripe(configService.getOrThrow('STRIPE_SECRET_KEY')),
      inject: [ConfigService],
    },
  ],
})
export class CheckoutModule {}
