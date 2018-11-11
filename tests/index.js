var Dat = require('..')
var test = require('tape')

test('create a dat in memory', function (t) {
  t.plan(6)
  var dat = new Dat()
  t.equals(dat.repos.length, 0, 'has zero repos before adding')
  dat.add(function (repo) {
    t.equals(dat.repos.length, 1, 'has one repo after adding')
    t.equals(repo.archive.key.length, 32, 'has key with proper length')
    t.equals(repo.archive.key.toString('hex'), repo.key, 'key is the archive key')
    repo.on('close', function () {
    })
  })
  dat.on('repo', function (repo) {
    t.ok(repo, 'emits the repo event')
    t.equals(repo.key.length, 64, 'repo key is there')
    dat.close()
  })
  dat.on('close', function () {
    t.end()
  })
})
