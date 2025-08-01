interface ICreateTopicsPayload {
    config: {
        bootstrapServer: string;
        securityProtocol: 'plaintext' | 'ssl' | 'sasl_plaintext' | 'sasl_ssl';
    };
    topics: string[];
}
export declare const createKafkaTopicsIfMissing: ({ config, topics }: ICreateTopicsPayload) => Promise<boolean | undefined>;
export {};
//# sourceMappingURL=create-kafka-topics.d.ts.map