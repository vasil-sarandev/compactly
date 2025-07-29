import { KafkaMessage } from '@confluentinc/kafka-javascript/types/kafkajs';

export const handleSlugPoolLowCount = (msg: KafkaMessage) => {
  // TODO: handle the subscription to topic here.
  console.log('handling low slug pool count rn', msg);
};
