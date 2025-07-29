import { KafkaJS } from '@confluentinc/kafka-javascript';
import {
  KAFKA_CONSUMERS_POOL_MANAGER,
  KAFKA_SECURITY_PROTOCOL,
  KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
} from '@shared/util';
import { KAFKA_BOOTSTRAP_SERVER } from '@/env-constants';
import { handleSlugPoolLowCount } from '@/handlers/low-count-topic';

const kafkaConsumer = new KafkaJS.Kafka().consumer({
  'bootstrap.servers': KAFKA_BOOTSTRAP_SERVER,
  'security.protocol': KAFKA_SECURITY_PROTOCOL,
  'group.id': KAFKA_CONSUMERS_POOL_MANAGER,
});

const connectKafkaConsumer = async () => {
  await kafkaConsumer.connect();

  await kafkaConsumer.subscribe({
    topic: KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
  });

  kafkaConsumer.run({
    eachMessage: async ({ topic, message }) => {
      // add more handlers here
      if (topic === KAFKA_SLUG_POOL_LOW_COUNT_TOPIC) {
        handleSlugPoolLowCount(message);
      }
    },
  });
};

export const connectKafka = async () => {
  await connectKafkaConsumer();
};
