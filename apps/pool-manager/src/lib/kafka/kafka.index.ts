import { KafkaJS } from '@confluentinc/kafka-javascript';
import {
  KAFKA_SECURITY_PROTOCOL,
  KAFKA_CONSUMERS_POOL_MANAGER,
  KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
  createKafkaTopicsIfMissing,
} from '@packages/shared/lib';
import { KAFKA_BOOTSTRAP_SERVER } from '@/env-constants';
import { slugTopicsConsumer } from '@/components/slug/slug.consumer';

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
      const parsedMessageValue = message.value ? JSON.parse(message.value.toString()) : {};
      // add more handlers here
      if (topic === KAFKA_SLUG_POOL_LOW_COUNT_TOPIC) {
        slugTopicsConsumer.handleSlugPoolLowCountTransaction(parsedMessageValue);
      }
    },
  });
};

export const connectKafka = async () => {
  // kafka topics must exist before being subscribed to.
  await createKafkaTopicsIfMissing({
    config: { bootstrapServer: KAFKA_BOOTSTRAP_SERVER, securityProtocol: KAFKA_SECURITY_PROTOCOL },
    topics: [KAFKA_SLUG_POOL_LOW_COUNT_TOPIC],
  });
  await connectKafkaConsumer();
};
