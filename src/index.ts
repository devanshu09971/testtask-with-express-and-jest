import { PORT } from './constants/constants';
import app from "./app";

app.listen(PORT, () => {
  // tslint:disable-next-line
  console.log("Express server listening on port " + PORT);
});
