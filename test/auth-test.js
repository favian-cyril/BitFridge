import sinon from 'sinon'
import { assert } from 'chai'
import { User } from '../models'

describe('User login via Facebook', function () {
  it('should sign up guests via Facebook', function () {
    // Check if user.facebook exists
  })
  it('should save guest info into the linked account', function () {
    // Verify that fridge is saved into the linked account
  })
  it('should save Facebook profile data', function () {
    // User's name should be the display name on Facebook
    // User should have Facebook data attached to the user model
    // such as name, id, token, and picture
  })
  it('should clear session data on user logout', function () {
    // Verify that session.user is null
  })
})

describe('User login via Google', function () {
  it('should sign up guests via Google', function () {
    // Check if user.google exists
  })
  it('should save guest info into the linked account', function () {
    // Verify that fridge is saved into the linked account
  })
  it('should save Google profile data', function () {
    // User's name should be the display name on Googke
    // User should have Facebook data attached to the user model
    // such as name, id, token, and picture
  })
  it('should clear session data on user logout', function () {
    // Verify that session.user is null
  })
})