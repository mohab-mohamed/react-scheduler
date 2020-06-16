const passport = require("passport");
const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log("trying to redirect");
      // console.log(req);
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
    console.log("getting user");
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/task", async (req, res) => {
    try {
      console.log("posting task");
      const id = req.body._id;
      const selectedUser = await db.User.findById(ObjectId(id));
      selectedUser.todos.push({
        task: req.body.task,
        completed: req.body.completed,
      });
      await selectedUser.save();
      console.log("posting success:", selectedUser);
      res.send(selectedUser);
    } catch (err) {
      console.log("ERROR IS: ", err);
      res.status(401).json(err);
    }
  });

  app.post("/api/time_table", async (req, res) => {
    try {
      console.log("posting task");
      const id = req.body._id;
      const existingUser = await db.User.find({
        _id: ObjectId(id),
        timeTables: { $elemMatch: { date: req.body.date } },
      });
      console.log(existingUser.length);
      if (existingUser.length !== 0) {
        console.log(existingUser[0]);
        const index = existingUser[0].timeTables.findIndex(
          (timeTable) => timeTable.date === req.body.date
        );
        existingUser[0].timeTables[index].timeTable = req.body.timeTable;
        await existingUser[0].save();
        res.send(existingUser);
      } else {
        const selectedUser = await db.User.findById(ObjectId(id));
        selectedUser.timeTables.push({
          date: req.body.date,
          timeTable: req.body.timeTable,
        });
        await selectedUser.save();
        console.log("posting success:", selectedUser);
        res.send(selectedUser);
      }
    } catch (err) {
      console.log("ERROR IS: ", err);
      res.status(401).json(err);
    }
  });

  // const testUser = await db.User.find({_id: ObjectId(id), timeTables: {$elemMatch: {date: req.body.date}} });
  // db.User.findOne({ userId: profile.id }).then((existingUser) => {
  //   if (existingUser) {
  //     existingUser.access = accessToken;
  //     existingUser.save().then((existingUser) => {
  //       done(null, existingUser);
  //     });
  //   } else {
  //     new db.User({
  //       userId: profile.id,
  //       username: profile.displayName,
  //       picture: profile._json.picture,
  //       todos: [],
  //       access: accessToken,
  //       timeTables: [],
  //     })
  //       .save()
  //       .then((user) => {
  //         done(null, user);
  //       });
  //   }
  // });

  app.get("/api/time_table/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      console.log(_id);
      console.log(req);
      db.User.findById(ObjectId(_id)).then((user) => {
        res.send(user.timeTables);
      });
    } catch (err) {}
  });
};
