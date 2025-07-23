import { KafkaJS } from '@confluentinc/kafka-javascript';
import { KAFKA_SECURITY_PROTOCOL } from '@shared/util';
import { KAFKA_BOOTSTRAP_SERVER } from '@/env-constants';

export const kafka = new KafkaJS.Kafka().producer({
  'bootstrap.servers': KAFKA_BOOTSTRAP_SERVER,
  'security.protocol': KAFKA_SECURITY_PROTOCOL,
});

export const connectKafka = async () => {
  await kafka.connect();
};
