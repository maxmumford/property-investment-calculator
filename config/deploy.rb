# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'property-investment-calculator'
set :repo_url, 'git@github.com:maxmumford/property-investment-calculator.git'
set :pm2_config, ->{ "#{fetch(:deploy_to)}/current/config/pm2.json" }

set :linked_files, fetch(:linked_files, []).push('config/secrets.json')
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules')

namespace :deploy do
  after :updated, "node:install"
  after :updated, "typescript:transpile"
  after :publishing, "pm2:recreate"
end
