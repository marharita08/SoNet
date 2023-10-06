echo "$(date): Running delete-expired-password-tokens.sh" >> /var/log/cron.log
exec >> /var/log/cron.log 2>&1
psql -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -c "DELETE FROM reset_password_tokens WHERE expires_on < NOW();"
