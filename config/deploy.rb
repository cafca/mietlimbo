set :application, "mietlimbo-blog"
set :repo_url, "git@github.com:ciex/mietlimbo.git"

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/pv/mietlimbo-blog"
set :scm, :none
set :repository, '_site'
set :deploy_via, :copy
set :copy_compression, :gzip
set :use_sudo, false

# the name of the user that should be used for deployments on your VPS
set :user, "pv"

# the ip address of your VPS
role :web, "139.59.149.193"

before 'deploy:update', 'deploy:update_jekyll'

namespace :deploy do
  [:start, :stop, :restart, :finalize_update].each do |t|
    desc "#{t} task is a no-op with jekyll"
    task t, :roles => :app do ; end
  end

  desc 'Run jekyll to update site before uploading'
  task :update_jekyll do
    # clear existing _site
    # build site using jekyll
    # remove Capistrano stuff from build
    %x(rm -rf _site/* && bundle exec jekyll build && rm _site/Capfile && rm -rf _site/config)
  end
end