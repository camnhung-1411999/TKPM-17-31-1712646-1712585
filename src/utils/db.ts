import mongoose from "mongoose";

class Database {
  private connection: any;
  public uri: string;
  constructor() {
    this.uri =
      "mongodb+srv://hoangman:123@cluster0-ascy6.mongodb.net/hoangman?retryWrites=true&w=majority";
    this.onConnection();
  }

  public onConnection(): void {
    this.connection = mongoose.connection;

    this.connection.on("connected", () => {
      console.log("Mongo Connection Established");
    });

    this.connection.on("reconnected", () => {
      console.log("Mongo Connection Reestablished");
    });

    this.connection.on("disconnected", () => {
      console.log("Mongo Connection Disconnected");
      console.log("Trying to reconnect to Mongo...");
      setTimeout(() => {
        mongoose.connect(this.uri, {
          keepAlive: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          socketTimeoutMS: 3000,
          connectTimeoutMS: 3000,
        });
      }, 3000);
    });
    this.connection.on("close", () => {
      console.log("Mongo Connection Closed");
    });

    this.connection.on("error", (error: Error) => {
      console.log("Mongo Connection Error:" + error);
    });

    const run = async () => {
      await mongoose.connect(this.uri, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    };

    run().catch((error) => console.error(error));
  }
}

export default Database;
