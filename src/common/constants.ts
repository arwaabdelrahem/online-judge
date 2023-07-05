export enum DatabaseModelNames {
  LANGUAGE_MODEL = 'languages',
  PROBLEM_MODEL = 'problems',
  PRODUCT_MODEL = 'products',
  USER_MODEL = 'users',
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum EventsName {
  FAILED_TEST_CASE = 'oj-failed-test-case',
  PASSED_TEST_CASE = 'oj-passed-test-case',
}

export enum KafkaServicesName {
  TEST_CASES_SERVICE = 'TEST_CASES_SERVICE',
}

export enum KafkaConsumersName {
  TEST_CASES_CONSUMER = 'test-cases-consumer',
}

export enum KafkaTopicsName {
  TEST_CASES_TOPIC = 'test-cases-topic',
}

export enum KafkaClientsName {
  TEST_CASES = 'test-cases',
}

export enum QueuesName {
  PROBLEMS_QUEUE = 'problems-queue',
}
