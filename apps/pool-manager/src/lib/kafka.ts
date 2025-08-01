import { KafkaJS } from '@confluentinc/kafka-javascript';
import {
  KAFKA_SECURITY_PROTOCOL,
  KAFKA_CONSUMERS_POOL_MANAGER,
  KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
  createKafkaTopicsIfMissing,
} from '@packages/shared/lib';
import { SlugPoolType } from '@packages/shared/schemas';
import { handleSlugPoolLowCountTransaction } from '@/consumers/low-count-topic';
import { KAFKA_BOOTSTRAP_SERVER } from '@/env-constants';

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
        const parsedMessageValue = message.value ? JSON.parse(message.value.toString()) : {};
        handleSlugPoolLowCountTransaction(parsedMessageValue.type || SlugPoolType.default);
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
