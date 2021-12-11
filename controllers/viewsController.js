const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) get tourdata from collections
  const tours = await Tour.find();
  // 2) bild templated collections

  // 3) render that template using data from step 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  // 1) get the data for requested tour (including guides and reviews)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('There is no Tour  with that name.', 404));
  }
  // 2) Build template using data from step

  // 3) Render template using data from step 1
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   'default-src self https://*.mapbox.com https://api.mapbox.com https://events.mapbox.com'
    // )
    .render('tour', {
      title: `${tour.name} tour`,
      tour,
    });
});

// LOGIN FORM

exports.getLoginForm = (req, res) => {
  // 3) Render template using data from step 1
  res.status(200).render('login', {
    title: `Log into your account!`,
  });
};
exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: `Join us, sign up!`,
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: `Your account`,
  });
};
exports.getConfirm = (req, res) => {
  res.status(200).render('confirm', {
    title: `Confirm your account`,
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) find tours with the returned IDs create array with map
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('account', {
    title: `Your account`,
    user: updatedUser,
  });
});
