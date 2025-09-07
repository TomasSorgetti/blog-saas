export default class ElasticsearchService {
  constructor(client) {
    this.client = client;
  }

  async indexDocument(index, id, document) {
    return this.client.index({
      index,
      id,
      document,
    });
  }

  async getDocument(index, id) {
    const result = await this.client.get({ index, id });
    return result._source;
  }

  async search(index, query) {
    const result = await this.client.search({
      index,
      query,
    });
    return result.hits.hits.map((hit) => hit._source);
  }

  async deleteDocument(index, id) {
    return this.client.delete({ index, id });
  }
}
