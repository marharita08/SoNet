const router = require('express').Router();
const asyncHandler = require('../middleware/asyncHandler');
const storage = require('../db/friends/storage');
const authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/status/:current_user_id/:user_id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { user_id: userID } = req.params;
    let { current_user_id: currentUserID } = req.params;
    const row = await storage.get(userID, currentUserID);
    if (row[0] === undefined) {
      res.send('not friends');
      return;
    }
    const { from_user_id: fromUserID, status_id: statusID } = row[0];
    currentUserID = parseInt(currentUserID, 10);
    if (statusID === 2) {
      res.send('friends');
    } else if (fromUserID === currentUserID) {
      res.send('outgoing request');
    } else {
      res.send('incoming request');
    }
  })
);

router.post(
  '/',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { from_user_id: fromUserID, to_user_id: toUserID } = req.body;
    await storage.create({
      from_user_id: fromUserID,
      to_user_id: toUserID,
      status_id: 1,
    });
    res.send({ message: 'Request for friendship was sent successfully' });
  })
);

router.put(
  '/accept',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { from_user_id: fromUserID, to_user_id: toUserID } = req.body;
    await storage.update(
      {
        status_id: 2,
      },
      fromUserID,
      toUserID
    );
    res.send({ message: 'User was added to friends successfully' });
  })
);

router.put(
  '/decline',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { from_user_id: fromUserID, to_user_id: toUserID } = req.body;
    await storage.update(
      {
        status_id: 3,
      },
      fromUserID,
      toUserID
    );
    res.send({ message: 'Request for friendship was denied successfully' });
  })
);

router.delete(
  '/:current_user_id/:user_id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { current_user_id: currentUserID, user_id: userID } = req.params;
    const row = await storage.get(userID, currentUserID);
    if (row[0] === undefined) {
      res.status(404).send('Request for friendship not found');
      return;
    }
    const { status_id: statusID } = row[0];
    await storage.delete(userID, currentUserID);
    if (statusID === 2) {
      res.send({ message: 'User was deleted from friends successfully' });
    } else {
      res.send({ message: 'Request for friendship was deleted successfully' });
    }
  })
);

module.exports = router;
