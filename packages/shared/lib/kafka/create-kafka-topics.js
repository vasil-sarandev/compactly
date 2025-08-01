"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKafkaTopicsIfMissing = void 0;
const kafka_javascript_1 = require("@confluentinc/kafka-javascript");
const createKafkaTopicsIfMissing = async ({ config, topics }) => {
    const kafkaAdmin = new kafka_javascript_1.KafkaJS.Kafka().admin({
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
exports.createKafkaTopicsIfMissing = createKafkaTopicsIfMissing;
