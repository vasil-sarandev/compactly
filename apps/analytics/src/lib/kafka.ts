import { KafkaJS } from '@confluentinc/kafka-javascript';
import {
  KAFKA_SECURITY_PROTOCOL,
  KAFKA_CONSUMERS_POOL_MANAGER,
  createKafkaTopicsIfMissing,
  KAFKA_PAGEVIEW_TOPIC,
} from '@packages/shared/lib';
import { KAFKA_BOOTSTRAP_SERVER } from '@/env-constants';
import { handlePageViewTopic } from '@/consumers/page-view';

const kafkaConsumer = new KafkaJS.Kafka().consumer({
  'bootstrap.servers': KAFKA_BOOTSTRAP_SERVER,
  'security.protocol': KAFKA_SECURITY_PROTOCOL,
  'group.id': KAFKA_CONSUMERS_POOL_MANAGER,
});

const connectKafkaConsumer = async () => {
  await kafkaConsumer.connect();

  await kafkaConsumer.subscribe({
    topic: KAFKA_PAGEVIEW_TOPIC,
  });

  kafkaConsumer.run({
    eachMessage: async ({ topic, message }) => {
      const parsedMessageValue = message.value ? JSON.parse(message.value.toString()) : {};
      // add more handlers here
      if (topic === KAFKA_PAGEVIEW_TOPIC) {
        handlePageViewTopic(parsedMessageValue);
      }
    },
  });
};

export const connectKafka = async () => {
  // kafka topics must exist before being subscribed to.
  await createKafkaTopicsIfMissing({
    config: { bootstrapServer: KAFKA_BOOTSTRAP_SERVER, securityProtocol: KAFKA_SECURITY_PROTOCOL },
    topics: [KAFKA_PAGEVIEW_TOPIC],
  });
  await connectKafkaConsumer();
};
