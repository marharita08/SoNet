psql -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -c "DELETE FROM reset_password_tokens WHERE expires_on < NOW();"
