import { KafkaJS } from '@confluentinc/kafka-javascript';

interface ICreateTopicsPayload {
  config: {
    bootstrapServer: string;
    securityProtocol: 'plaintext' | 'ssl' | 'sasl_plaintext' | 'sasl_ssl';
  };
  topics: string[];
}

export const createKafkaTopicsIfMissing = async ({ config, topics }: ICreateTopicsPayload) => {
  const kafkaAdmin = new KafkaJS.Kafka().admin({
    'bootstrap.servers': config.bootstrapServer,
    'security.protocol': config.securityProtocol,
  });
  await kafkaAdmin.connect();

  const kafkaTopics = await kafkaAdmin.listTopics();
  const missingTopics = topics.filter(topic => !kafkaTopics.includes(topic));

  if (missingTopics.length) {
    const topicsConfig = missingTopics.map(t => ({
      topic: t,
      numPartitions: 1,
      replicationFactor: 1,
    }));
    return await kafkaAdmin.createTopics({ topics: topicsConfig });
  }
};
