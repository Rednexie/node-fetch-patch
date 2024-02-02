sudo su 
apt uninstall mysql-server
apt-get purge mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*
sudo rm -rf /var/lib/mysql/
sudo rm -rf /var/log/mysql
sudo deluser --remove-home mysql
sudo delgroup mysql
sudo apt autoclean
sudo apt autoremove