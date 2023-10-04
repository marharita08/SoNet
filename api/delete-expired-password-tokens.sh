export PGPASSWORD="password"
export PGHOST="db"
export PGPORT="5432"
export PGUSER="postgres"
export PGDATABASE="network"

psql -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -c "DELETE FROM reset_password_tokens WHERE expires_on < NOW();"

unset PGPASSWORD
unset PGHOST
unset PGPORT
unset PGUSER
unset PGDATABASE
